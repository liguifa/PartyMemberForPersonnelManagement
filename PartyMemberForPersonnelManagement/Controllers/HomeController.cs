using Common;
using Data.Access;
using SportsVenueBookingCommon;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PartyMemberForPersonnelManagement.Controllers
{
    public class HomeController : Controller
    {
        AccessHelper db = new AccessHelper();
        //
        // GET: /Home/

        [HttpGet]
        [UserAuthorization("admin", "/Home/Login")]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult LoginIn(string username, string password)
        {
            StatusAttribute res = new StatusAttribute();
            DataTable dt = db.AccessReader("select password,ID from admins where username='" + username + "'");
            if (dt.Rows.Count > 0 && dt.Rows[0][0].ToString() == Md5.GetMd5Word(username, password).ToString())
            {
                res.status = true;
                res.message = "登录成功！";
                HttpContext.Session["admin"] = dt.Rows[0][1];
            }
            else
            {
                res.status = false;
                res.message = "登录失败！用户名或密码错误...";
            }
            return Json(res);
        }

        [HttpPost]
        [UserAuthorization("admin", "/Home/Login")]
        public string GetUserList(int page, int rows)
        {
            DataTable dt = db.AccessReader("select top " + rows + " * from Users where IsDel=0 and ID not in (select top " + (page - 1) * rows + 1 + " ID from Users where IsDel=0)");
            int count = Convert.ToInt32(db.AccessScaler("select count(*) from Users where IsDel=0")) - 1;
            string json = "{\"total\":\"" + count + "\",\"rows\":[";
            foreach (DataRow dr in dt.Rows)
            {
                json += "{\"ID\":\"" + dr["ID"] + "\",\"Name\":\"" + dr["Name"] + "\",\"StudentId\":\"" + dr["StudentId"] + "\",\"Sex\":\"" + dr["Sex"] + "\",\"BirthDate\":\"" + dr["BirthDate"] + "\",\"Address\":\"" + dr["Address"] + "\",\"SubmitDate\":\"" + dr["SubmitDate"] + "\",\"SuccessDate\":\"" + dr["SuccessDate"] + "\",\"GraduationDate\":\"" + dr["GraduationDate"] + "\",\"Absorption\":\"" + dr["Absorption"] + "\",\"Positive\":\"" + dr["Positive"] + "\"},";
            }
            json = json.Substring(0, json.Length - 1) + "]}";
            return json;
        }

        [HttpPost]
        [UserAuthorization("admin", "/Home/Login")]
        public JsonResult DelUser(int id)
        {
            StatusAttribute res = new StatusAttribute();
            try
            {
                if (db.AccessQuery("Update Users set IsDel=1 where ID=" + id) >= 1)
                {
                    res.status = true;
                    res.message = "删除成功！";
                }
                else
                {
                    res.status = false;
                    res.message = "删除失败！未知错误...";
                }
            }
            catch
            {
                res.status = false;
                res.message = "删除失败！未知错误...";
            }
            return Json(res);
        }

        [HttpPost]
        [UserAuthorization("admin", "/Home/Login")]
        public PartialViewResult AddData()
        {
            return PartialView();
        }

        [HttpPost]
        [UserAuthorization("admin", "/Home/Login")]
        public JsonResult AddDataIn(string name, string stuId, string sex, string arddress, string cs, string tj, string cw, string jy, string ss, string zz)
        {
            StatusAttribute res = new StatusAttribute();
            try
            {
                if (db.AccessQuery("insert into Users(Name,StudentId, Sex, BirthDate, Address, SubmitDate, SuccessDate, GraduationDate, Absorption, Positive, IsDel)  values('" + name + "','" + stuId + "'," + (sex == "男" ? 0 : 1) + ",'" + cs + "','" + arddress + "','" + tj + "','" + cw + "','" + jy + "','" + ss + "','" + zz + "',0)") >= 1)
                {
                    res.status = true;
                    res.message = "添加成功！";
                }
                else
                {
                    res.status = false;
                    res.message = "添加失败！未知错误...";
                }
            }
            catch
            {
                res.status = false;
                res.message = "添加失败！未知错误...";
            }
            return Json(res);
        }

        [HttpPost]
        [UserAuthorization("admin", "/Home/Login")]
        public PartialViewResult UpdateData(string id)
        {
            ViewBag.data = db.AccessReader("select * from Users where id=" + id).Rows[0];
            return PartialView();
        }

        [HttpPost]
        [UserAuthorization("admin", "/Home/Login")]
        public JsonResult UpdateDataIn(int id, string name, string stuId, string sex, string arddress, string cs, string tj, string cw, string jy, string ss, string zz)
        {
            StatusAttribute res = new StatusAttribute();
            try
            {
                if (db.AccessQuery("Update Users set Name='" + name + "',StudentId='" + stuId + "', Sex=" + (sex == "男" ? 0 : 1) + ", BirthDate='" + cs + "', Address='" + arddress + "', SubmitDate='" + tj + "', SuccessDate='" + cw + "', GraduationDate='" + jy + "', Absorption='" + ss + "', Positive='" + zz + "' where ID=" + id) >= 1)
                {
                    res.status = true;
                    res.message = "修改成功！";
                }
                else
                {
                    res.status = false;
                    res.message = "修改失败！未知错误...";
                }
            }
            catch
            {
                res.status = false;
                res.message = "修改失败！未知错误...";
            }
            return Json(res);
        }
    }
}






