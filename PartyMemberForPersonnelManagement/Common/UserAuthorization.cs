/*
 * 作者：李贵发
 * 时间：2015-03-13
 * 功能：自定义用户登录权限验证
 * 文件：UserAuthorization.cs
*/
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace SportsVenueBookingCommon
{
    #region 权限验证类+public class UserAuthorization : AuthorizeAttribute
    /// <summary>
    /// 权限验证类
    /// </summary>
    public class UserAuthorization : AuthorizeAttribute
    {
        #region 初始化权限验证类+public UserAuthorization(string permissionName = "", string url = "")
        /// <summary>
        /// 初始化权限验证类
        /// </summary>
        /// <param name="permissionName">权限名称</param>
        /// <param name="url">重定向路径</param>
        public UserAuthorization(string permissionName = "", string url = "")
        {
            this.PermissionName = permissionName;
            this.Url = url;
        }
        #endregion

        #region 权限名称+public string PermissionName { get; private set; }
        /// <summary>
        /// 权限名称
        /// </summary>
        public string PermissionName { get; private set; }
        #endregion

        #region 重定向路径+ public string Url { get; set; }
        /// <summary>
        /// 重定向路径
        /// </summary>
        public string Url { get; set; }
        #endregion

        #region 验证用户是否授权+protected override bool AuthorizeCore(HttpContextBase httpContext)
        /// <summary>
        /// 验证用户是否授权
        /// </summary>
        /// <param name="httpContext">http上下文，封装http信息</param>
        /// <returns>true用户授权，false用户未授权</returns>
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null)
            {
                return false;
            }
            else if (!httpContext.User.Identity.IsAuthenticated)
            {
                return httpContext.Session[this.PermissionName] != null;     //验证用户是否登陆
            }
            return false;
        }
        #endregion

        #region 重写OnAuthorization方法，完成未授权用重定向登陆页+public override void OnAuthorization(AuthorizationContext filterContext)
        /// <summary>
        /// 重写OnAuthorization方法，完成未授权用重定向登陆页
        /// </summary>
        /// <param name="filterContext">对使用AuthorizeAttribute特性时所需的信息进行封装</param>
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            if (filterContext.Result != null && ((HttpStatusCodeResult)(filterContext.Result)).StatusCode == 401)      //状态码为401表明用户没有登陆，则重定向至登陆页面
            {
                filterContext.Result = new RedirectResult(this.Url);
            }
        }
        #endregion
    } 
    #endregion
}
