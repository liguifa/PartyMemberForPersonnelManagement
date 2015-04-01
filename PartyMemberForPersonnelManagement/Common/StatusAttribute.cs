/*
 * 作者：李贵发
 * 时间：2015-03-20
 * 文件：StatusAttribute.cs
 * 功能：返回消息内容
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SportsVenueBookingCommon
{
    #region 状态类+public class StatusAttribute
    /// <summary>
    /// 状态类
    /// </summary>
    public class StatusAttribute
    {
        #region 消息状态+public bool status { get; set; }
        /// <summary>
        /// 消息状态
        /// </summary>
        public bool status { get; set; }
        #endregion

        #region 消息内容+public string message { get; set; }
        /// <summary>
        /// 消息内容
        /// </summary>
        public string message { get; set; }
        #endregion

        #region 消息附加+public object append { get; set; }
        /// <summary>
        /// 消息附加
        /// </summary>
        public object append { get; set; }
        #endregion
    }
    #endregion
}
