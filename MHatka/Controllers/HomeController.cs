using MHatka.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MHatka.Controllers
{
    public class HomeController : Controller
    { 
        public ActionResult Index()
        {            
            return View("Index");
        }

        public ActionResult Products(int productId)
        {
            return View("Products");
        }
        public ActionResult ProdInfo(int productId)
        {
            return View("ProdInfo");
        }
        public ActionResult Basket()
        {
            return View("Basket");
        }
    }
}
