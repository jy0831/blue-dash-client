import { getLiveData } from '../aftvClient/index.js'
import { query } from "../mariadb.js";
import {ipcMain } from 'electron';

ipcMain.handle('getData:date', async (e, date) => {
  const queryStr = `
    with staticViwers as (
      select ts.NAME, count(vs.ID) as STATIC_VIWERS, tb.BROADCAST_DATE, SUM(vs.total_view_time) as total_view_time from tb_daily_view_scores vs
      left join tb_users tu on vs.USER_ID = tu.ID
      left join tb_broadcasts tb on vs.BROADCAST_ID = tb.ID
      left join tb_streamers ts on ts.ID = tb.STREAMER_ID
      where tb.BROADCAST_DATE = '${date}' and vs.TOTAL_VIEW_TIME > (tb.DURATION/2) 
      group by ts.NAME
    )
    select 
      ts.NAME, 
      count(vs.ID) as VIWERS, 
      sv.static_viwers as STATIC_VIWERS, 
      tb.BROADCAST_DATE, 
      SUM(vs.total_view_time) as VT,
      sv.total_view_time as STATIC_VT
    from tb_daily_view_scores vs
    left join tb_users tu on vs.USER_ID = tu.ID
    left join tb_broadcasts tb on vs.BROADCAST_ID = tb.ID
    left join tb_streamers ts on ts.ID = tb.STREAMER_ID
    left join staticViwers sv on sv.NAME = ts.NAME
    where tb.BROADCAST_DATE = '${date}'
    group by ts.NAME;
  `;
  const result = await query(queryStr);
  for (let idx = 0; idx < result.length; idx++) {
    const streamer = result[idx];
    const name = streamer.NAME;
    const queryStr2 = `
      WITH 
      viwersByStreamer AS (
          SELECT tu.VIEWER_ID
          FROM tb_daily_view_scores vs
          JOIN tb_users tu ON vs.USER_ID = tu.ID
          JOIN tb_broadcasts tb ON vs.BROADCAST_ID = tb.ID
          JOIN tb_streamers ts ON ts.ID = tb.STREAMER_ID
          WHERE ts.NAME = '${name}'
            AND tb.BROADCAST_DATE = '${date}'
      ),
      staticByStreamer AS (
          SELECT tu.VIEWER_ID
          FROM tb_daily_view_scores vs
          JOIN tb_users tu ON vs.USER_ID = tu.ID
          JOIN tb_broadcasts tb ON vs.BROADCAST_ID = tb.ID
          JOIN tb_streamers ts ON ts.ID = tb.STREAMER_ID
          WHERE ts.NAME = '${name}'
            AND tb.BROADCAST_DATE = '${date}'
            AND vs.TOTAL_VIEW_TIME >= (tb.DURATION / 2)
      )
      SELECT 
        ts.NAME AS STREAMER_NAME, 
        COUNT(DISTINCT CASE WHEN tu.VIEWER_ID IN (SELECT VIEWER_ID FROM viwersByStreamer) THEN tu.VIEWER_ID END) AS VIWERS,
        SUM(DISTINCT CASE WHEN tu.VIEWER_ID IN (SELECT VIEWER_ID FROM viwersByStreamer) THEN vs.total_view_time end) as VIWERS_VT,
        COUNT(DISTINCT CASE WHEN tu.VIEWER_ID IN (SELECT VIEWER_ID FROM staticByStreamer) THEN tu.VIEWER_ID END) AS "STATIC",
        SUM(DISTINCT CASE WHEN tu.VIEWER_ID IN (SELECT VIEWER_ID FROM staticByStreamer) THEN vs.total_view_time end) as STATIC_VT
      FROM tb_daily_view_scores vs
      JOIN tb_users tu ON vs.USER_ID = tu.ID
      JOIN tb_broadcasts tb ON vs.BROADCAST_ID = tb.ID
      JOIN tb_streamers ts ON ts.ID = tb.STREAMER_ID
      WHERE tb.BROADCAST_DATE = '${date}'
        AND ts.NAME != '${name}'
      GROUP BY ts.NAME;
    `;
    const details = await query(queryStr2);
    result[idx]['SHARE_VIERS'] = details;
  }
  return result;
});

ipcMain.handle('getData:Live', async (e, id) => {
  const queryStr = `
    SELECT * FROM tb_streamers;
  `;
  const ids = await query(queryStr);
  if (!Array.isArray(ids)) {
    return [];
  }
  const dataArr = [];
  for (let idx = 0; idx < ids.length; idx++) {
    const row = ids[idx];
    const result = await getLiveData(row.STREAMER_UID);
    Object.assign(result, row);
    dataArr.push(result);
  }
  return dataArr;
});

ipcMain.handle('getData:ViewersByStreamer', async (e) => {
  const queryStr = `
    with OriginUsers as (
      select * from tb_users u group by u.BASE_VIEWER_ID
    )
    select tu.MAIN_STREAM, count(tu.id) as count from OriginUsers tu 
    left join tb_streamers ts on tu.MAIN_STREAM_ID = ts.ID 
    group by ts.ID;
  `;
  const dataArr = await query(queryStr);
  
  return dataArr;
});

ipcMain.handle('getData:ViewersMtricsByDate', async (e, range) => {
  console.log('range: ', range);
  
  const queryStr = `
    select ts.name, tb.BROADCAST_DATE, count(vs.id) as count from tb_daily_view_scores vs
    left join tb_broadcasts tb on vs.BROADCAST_ID = tb.ID
    left join tb_streamers ts ON tb.STREAMER_ID = ts.ID
    ${ range ? `where tb.BROADCAST_DATE >= '${range.start}' and tb.BROADCAST_DATE <= '${range.end}'` : ''}
    group by ts.NAME, tb.BROADCAST_DATE;
  `;
  const queryStr2 = `
    select MIN(tb.BROADCAST_DATE ) as start, Max(tb.BROADCAST_DATE) as "end" from tb_broadcasts tb
    ${ range ? `where tb.BROADCAST_DATE >= '${range.start}' and tb.BROADCAST_DATE <= '${range.end}'` : ''}
    ;
  `;
  const dataArr = await query(queryStr);
  const dateArr = await query(queryStr2);
  if (!Array.isArray(dataArr)) {
    return null;
  }
  const parseDataArr = new Map();
  console.log(range?.type);
  dataArr.forEach(item => {
    const d = new Date(item.BROADCAST_DATE);
    let dateStr;
    
    if (range?.type) {
      dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}`
    } else {
      dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }
    const nameArr = parseDataArr.get(item.name);
    if (nameArr && Array.isArray(nameArr)) {
      nameArr.push({ date: dateStr, value: Number(item.count) });
      parseDataArr.set(item.name, nameArr);
    } else {
      parseDataArr.set(item.name, [{ date: dateStr, value: Number(item.count) }]);
    }
  });
  // if (range?.type) {
  //   dateArr = [...new Set(dateArr.map(item => String(item).substring(0,6)))];
  // }
  return { parseDataArr, dateArr };
});