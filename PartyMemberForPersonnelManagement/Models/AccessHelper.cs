using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Configuration;

namespace Data.Access
{
    class AccessHelper
    {
        #region  private AccessbConnection DataConection()+Access数据库连接
        /// <summary>
        /// Access数据库连接
        /// </summary>
        /// <returns></returns>
        private OleDbConnection AccessConection()
        {
            return new OleDbConnection(ConfigurationManager.ConnectionStrings["strConn"].ToString());
        }
        #endregion

        #region public DataTable AccessReader(string sql)+Access数据库查询
        /// <summary>
        /// Access数据库查询
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public DataTable AccessReader(string sql)
        {
            using (OleDbConnection conn = this.AccessConection())
            {
                conn.Open();
                OleDbDataAdapter da = new OleDbDataAdapter(sql, conn);
                DataSet ds = new DataSet();
                da.Fill(ds, "table");
                conn.Close();
                return ds.Tables["table"];
            }
        }
        #endregion

        #region public int AccessQuery(string sql)+Access数据库的增、删、改.返回受影响行数
        /// <summary>
        /// Access数据库的增、删、改.返回受影响行数
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public int AccessQuery(string sql)
        {
            using (OleDbConnection conn = this.AccessConection())
            {
                conn.Open();
                OleDbCommand oc = new OleDbCommand(sql, conn);
                int result = oc.ExecuteNonQuery();
                conn.Close();
                return result;
            }
        }
        #endregion

        #region public object AccessScaler(string sql)+ Access数据库的增、删、改.返回结果集第一行第一列的值
        /// <summary>
        ///  Access数据库的增、删、改.返回结果集第一行第一列的值
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public object AccessScaler(string sql)
        {
            using (OleDbConnection conn = this.AccessConection())
            {
                conn.Open();
                OleDbCommand oc = new OleDbCommand(sql, conn);
                object result = oc.ExecuteScalar();
                conn.Close();
                return result;
            }
        }
        #endregion
    }
}
