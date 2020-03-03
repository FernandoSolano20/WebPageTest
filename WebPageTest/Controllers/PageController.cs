using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace WebPageTest.Controllers
{
    public class PageController : Controller
    {
        public void saveWebPageTest()
        {
            SqlConnection sqlCon = new SqlConnection(@"Data Source=(localhost)\SQLEXPRESS;Initial Catalog=WebPageTest;Integrated Security=True");
            SqlDataAdapter sqlda = new SqlDataAdapter("Select * from Test", sqlCon);
            DataTable dtbl = new DataTable();
            sqlda.Fill(dtbl);
            foreach (DataRow row in dtbl.Rows)
            {
                Console.WriteLine(row["ProductName"]);
            }
            Console.ReadKey();
        }
    }
}