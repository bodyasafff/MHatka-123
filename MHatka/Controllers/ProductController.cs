using MHatka.Models;
using MHatka.Models.ModelsMap;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace MHatka.Controllers
{
    public class ProductController : Controller
    {
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ContentResult GetMenu()
        {

            using (EfContext ctx = new EfContext())
            {
                Mapper mapper = new Mapper();
                List<ModelGlobalGroup> modelGlobalGroups = new List<ModelGlobalGroup>();


                ctx.GlobalGroups.ToList().ForEach(k => modelGlobalGroups.Add(mapper.MapGlobalGroup(k)));

                string json = JsonConvert.SerializeObject(modelGlobalGroups);

                return Content(json, "application/json");
            }
        }
        [HttpGet]
        public ContentResult GetSelected(string idgroup = "")
        {
            int idGroup = 0; Int32.TryParse(idgroup, out idGroup);
            using (EfContext ctx = new EfContext())
            {
                // var a = ctx.GlobalGroups.Select(k=>k.Groups.FirstOrDefault(j=>j.Name==group)).Select(dd=>dd.Id);


                //var groupid = ctx.GlobalGroups.Where(g => g.Id == idGlobalGroup).Select(p => p.Groups.FirstOrDefault(j => j.Name == group).Id).ToList().FirstOrDefault();
                MapSelectData msd = new MapSelectData();

                msd.Brends = ctx.Products.Where(j => j.Group.Id == idGroup && j.InStock == true).Where(d => (d.Brend.Name != "" ? true : false)).Select(p => p.Brend.Name).Distinct().ToList();
                msd.Countryes = ctx.Products.Where(j => j.Group.Id == idGroup && j.InStock == true).Where(d => (d.Country.Name != "" ? true : false)).Select(p => p.Country.Name).Distinct().ToList();
                msd.Fillers = ctx.Products.Where(j => j.Group.Id == idGroup && j.InStock == true).Where(d => (d.Filler.Name != "" ? true : false)).Select(p => p.Filler.Name).Distinct().ToList();
                msd.Materials = ctx.Products.Where(j => j.Group.Id == idGroup && j.InStock == true).Where(d => (d.Material.Name != "" ? true : false)).Select(p => p.Material.Name).Distinct().ToList();
                msd.TypeClothes = ctx.Products.Where(j => j.Group.Id == idGroup && j.InStock == true).Where(d => (d.TypeCloth.Name != "" ? true : false)).Select(p => p.TypeCloth.Name).Distinct().ToList();
                msd.Specials = ctx.Products.Where(j => j.Group.Id == idGroup && j.InStock == true).Where(d => (d.Special.Name != "" ? true : false)).Select(p => p.Special.Name).Distinct().ToList();


                string json = JsonConvert.SerializeObject(msd);
                return Content(json, "application/json");
            }
        }
        [HttpGet]
        public ActionResult GetProducts(string numPage = "", string idgroup = "", string country = "", string material = "", string brend = "", string typeCloth = "", string filler = "", string special = "")
        {
            int idGroup = 0; Int32.TryParse(idgroup, out idGroup);
            using (EfContext ctx = new EfContext())
            {
                int startSkip = (Int32.Parse(numPage) - 1) * 20;
                var products = ctx.Products.OrderBy(t => t.Id).Where(g => g.Group.Id == idGroup
                && g.InStock == true
                && (g.Country.Name == country || country == "")
                && (g.Material.Name == material || material == "")
                && (g.Brend.Name == brend || brend == "")
                && (g.TypeCloth.Name == typeCloth || typeCloth == "")
                && (g.Filler.Name == filler || filler == "")
                && (g.Special.Name == special || special == "")).Select(k => new { id = k.Id, name = k.Name,/*prices = k.Sizeers.Select(p=>p.Prices)*/ image = k.Images.Select(q => q.Name), price = k.Sizeers.FirstOrDefault().Prices.Content })
                 .Skip(startSkip).Take(20).ToList();


                int countProducts = ctx.Products.OrderBy(t => t.Id).
                    Where(g => g.Group.Id == idGroup
                    && g.InStock == true
                    && (g.Country.Name == country || country == "")
                    && (g.Material.Name == material || material == "")
                    && (g.Brend.Name == brend || brend == "")
                    && (g.TypeCloth.Name == typeCloth || typeCloth == "")
                    && (g.Filler.Name == filler || filler == "")
                    && (g.Special.Name == special || special == "")).Count();
                string json = JsonConvert.SerializeObject(new { products = products, countProducts = countProducts });
                return Content(json, "application/json");
            }
        }
        [HttpGet]
        public ActionResult GetProduct(string id = "")
        {

            int idProduct = 0; Int32.TryParse(id, out idProduct);
            using (EfContext ctx = new EfContext())
            {
                Mapper mapper = new Mapper();
                var product = ctx.Products.FirstOrDefault(q => q.Id == idProduct);
                var mapProduct = mapper.MappingProduct(product);
                string json = JsonConvert.SerializeObject(mapProduct);
                return Content(json, "application/json");
            }
        }
        [HttpGet]
        public ActionResult GetBasketProduct(string[] id)
        {
            id = id[0].Split(',');
            int temp = 0;
            Mapper mapper = new Mapper();
            List<MapProduct> mapProduct = new List<MapProduct>();
            if (id.Length >= 1)
            {

                using (EfContext ctx = new EfContext())
                {
                    foreach (var value in id)
                    {
                        Int32.TryParse(value, out temp);
                        var product = ctx.Products.FirstOrDefault(q => q.Id == temp);

                        mapProduct.Add(mapper.MappingProduct(product));

                    }
                }


            }
            string json = JsonConvert.SerializeObject(mapProduct);
            return Content(json, "application/json");
        }
        [HttpPost]
        public ActionResult SendMail(SendProd[] Id, string name = "", string phone = "", string city = "", string deliveryMethod = "")
        {

            MailAddress from = new MailAddress("Otciteam@gmail.com", "ModnaHatka!");
            MailAddress to = new MailAddress("tekstylrivne@gmail.com");
            MailMessage m = new MailMessage(from, to);
            m.Subject = "Заказ!";
            m.Body = "Продукти: " + "<br/> ";
            foreach (var item in Id)
            {
                m.Body += "http://tekstil-rivne.com.ua/Home/ProdInfo?productId=" + item.idProd + " Size: " + item.SetSize + "<br/> ";
            }
            m.Body += "Імя: " + name + "<br/> " + "Номер телефону: " + phone + "<br/> " + "Місто: " + city + "<br/> " + "Спосіб доставки: " + deliveryMethod;

            m.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);

            smtp.Credentials = new NetworkCredential("Otciteam@gmail.com", "Otciteam228");

            smtp.EnableSsl = true;
            smtp.Send(m);
            return Content("");
        }

        [HttpGet]
        public ActionResult GetMainInfo()
        {
            using (EfContext ctx = new EfContext())
            {
            string json = JsonConvert.SerializeObject(ctx.TopProducts.ToList());
            return Content(json, "application/json");
            }
        }
    }
}
