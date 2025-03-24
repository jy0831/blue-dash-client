import mariadb from "mariadb";

const pool = mariadb.createPool({
  host: '49.142.106.218',
  user: 'root',
  port: '31306',
  password: '3415',
  database: 'bluedash',
  connectionLimit: 50
});

export async function query(sql, params = {}) {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('MariaDB 연결 성공');
    const values = Object.values(params);
    const result = await conn.query(sql, values);
    conn.commit();
    return result;
  } catch (error) {
      console.error('쿼리 실행 실패:', error);
    // await conn.rollback(); // 실패 시 롤백
    throw error;
  } finally {
    if (conn) conn.release(); // 사용 후 커넥션 반환
  }
}


