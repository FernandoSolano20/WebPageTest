using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace WebPageTest.Controllers
{
    public class HomeController : Controller
    {
        private readonly HttpClient _client = new HttpClient();

        public ActionResult Index()
        {
            return View();
        }

        
        private async Task<object> GetDataFromWebPageTest(string url)
        {
            using (var httpClient = new HttpClient())
            {
                var result = await httpClient.GetAsync(url).ConfigureAwait(false);
                var responseBody = await result.Content.ReadAsStringAsync();
                return responseBody;
            }
            
        }

        [HttpGet]
        public object GetData(string url)
        {
            return GetDataFromWebPageTest(url).GetAwaiter().GetResult();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}