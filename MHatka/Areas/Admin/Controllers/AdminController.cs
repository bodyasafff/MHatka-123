using MHatka.Models;
using MHatka.Models.ModelsMap;
using MHatka.Models.SaveImage;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace MHatka.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        EfContext ctx = new EfContext();
        // GET: Admin/Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult MainAdmin()
        {
            return View("MainAdmin");
        }
        [HttpGet]
        public ActionResult LogIn(string email = "", string password = "")
        {

            int count = ctx.Owners.Select(q => q.Count).FirstOrDefault();
            if (count <= 5)
            {
                int chek = ctx.Owners.Where(q => q.Email == email && q.Password == password).Count();
                if (chek == 1)
                {
                    Guid tokenGuid = Guid.NewGuid();
                    string token = tokenGuid.ToString();
                    ctx.Owners.FirstOrDefault().Count = 0;
                    ctx.Owners.FirstOrDefault().Token = token;
                    ctx.SaveChanges();
                    bool log = true;
                    string json = JsonConvert.SerializeObject(new { log = log, token = token });
                    return Content(json, "application/json");
                }
                else
                {
                    count++;
                    ctx.Owners.FirstOrDefault(q => q.Id == 1).Count = count;
                    ctx.SaveChanges();
                    bool log = false;
                    string json = JsonConvert.SerializeObject(log);
                    return Content(json, "application/json");
                }
            }
            else { return Content(""); }

        }
        [HttpPost]
        public ActionResult AddProduct(string[] img, string token = "", string name = "", string group = "", string article = "", string size = "", string price = "", string description = "", string brend = "", string country = "", string filler = "", string material = "", string special = "", string typeCloth = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int pricee = 0; Int32.TryParse(price, out pricee);
                int idgroup = 0; Int32.TryParse(group, out idgroup);
                List<Models.Image> temp = new List<Models.Image>();
                List<Sizeer> Sizeers = new List<Sizeer>();
                Sizeers.Add(new Sizeer
                {
                    InStock = true,
                    Sizes = ctx.Sizes.FirstOrDefault(c => c.Name == size) ?? new Models.Size { Name = size },
                    Prices = ctx.Prices.FirstOrDefault(c => c.Content == pricee) ?? new Price { Content = pricee }
                });
                Product product = new Product();
                foreach (var item in img)
                {
                    if (item != "")
                    {
                        temp.Add(new Models.Image { Name = item });
                    }
                }
                product.Images = temp;
                product.Name = name;
                product.Article = article;
                product.Description = description;
                product.Sizeers = Sizeers;
                product.InStock = true;
                product.Brend = ctx.Brends.FirstOrDefault(c => c.Name == brend) ?? new Brend { Name = brend };
                product.Group = ctx.Groups.FirstOrDefault(c => c.Id == idgroup);
                product.Country = ctx.Countries.FirstOrDefault(c => c.Name == country) ?? new Country { Name = country };
                product.Filler = ctx.Fillers.FirstOrDefault(c => c.Name == filler) ?? new Filler { Name = filler };
                product.Material = ctx.Materials.FirstOrDefault(c => c.Name == material) ?? new Material { Name = material };
                product.Special = ctx.Specials.FirstOrDefault(c => c.Name == special) ?? new Special { Name = special };
                product.TypeCloth = ctx.TypeCloths.FirstOrDefault(c => c.Name == typeCloth) ?? new TypeCloth { Name = typeCloth };
                ctx.Products.Add(product);
                ctx.SaveChanges();
            }
            return Content("");
        }
        [HttpPost]
        public ActionResult EditProduct(string[] img, bool ifChang, string idProduct = "", string token = "", string name = "", string group = "", string article = "", string size = "", string price = "", string description = "", string brend = "", string country = "", string filler = "", string material = "", string special = "", string typeCloth = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int pricee = 0; Int32.TryParse(price, out pricee);
                int idProd = 0; Int32.TryParse(idProduct, out idProd);
                int idgroup = 0; Int32.TryParse(group, out idgroup);
                List<Models.Image> temp = new List<Models.Image>();
                List<Sizeer> Sizeers = new List<Sizeer>();
                var product = ctx.Products.FirstOrDefault(p => p.Id == idProd);
                Sizeers.Add(new Sizeer
                {
                    Sizes = ctx.Sizes.FirstOrDefault(c => c.Name == size) ?? new Models.Size { Name = size },
                    Prices = ctx.Prices.FirstOrDefault(c => c.Content == pricee) ?? new Price { Content = pricee }
                });
                if (ifChang)
                {
                    var path = System.AppDomain.CurrentDomain.BaseDirectory;
                    foreach (var nam in product.Images)
                    {
                        if (System.IO.File.Exists(path + "\\Image\\" + nam.Name))
                        {
                            System.IO.File.Delete(path + "\\Image\\" + nam.Name);

                        }
                    }
                    product.Images.Clear();
                    foreach (var item in img)
                    {
                        if (item != "")
                        {
                            temp.Add(new Models.Image { Name = item });
                        }

                    }
                }
                product.Images = temp;
                product.Name = name;
                product.Article = article;
                product.Description = description;
                product.Sizeers = Sizeers;
                product.Brend = ctx.Brends.FirstOrDefault(c => c.Name == brend) ?? new Brend { Name = brend };
                product.Group = ctx.Groups.FirstOrDefault(c => c.Id == idgroup);
                product.Country = ctx.Countries.FirstOrDefault(c => c.Name == country) ?? new Country { Name = country };
                product.Filler = ctx.Fillers.FirstOrDefault(c => c.Name == filler) ?? new Filler { Name = filler };
                product.Material = ctx.Materials.FirstOrDefault(c => c.Name == material) ?? new Material { Name = material };
                product.Special = ctx.Specials.FirstOrDefault(c => c.Name == special) ?? new Special { Name = special };
                product.TypeCloth = ctx.TypeCloths.FirstOrDefault(c => c.Name == typeCloth) ?? new TypeCloth { Name = typeCloth };
                ctx.SaveChanges();
                foreach (var item in ctx.Images.ToList())
                {
                    if(item.Product == null)
                    {
                        ctx.Images.Remove(item);
                        ctx.SaveChanges();
                    }
                }
            }

            return Content("");
        }
        [HttpPost]
        public ActionResult AddSizeAndPrice(string id = "", string size = "", string price = "", string token = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int idProduct = 0; Int32.TryParse(id, out idProduct);
                int pricee = 0; Int32.TryParse(price, out pricee);

                var product = ctx.Products.FirstOrDefault(q => q.Id == idProduct);
                product.Sizeers.Add(new Sizeer
                {
                    InStock = true,
                    Sizes = ctx.Sizes.FirstOrDefault(c => c.Name == size) ?? new Models.Size { Name = size },
                    Prices = ctx.Prices.FirstOrDefault(c => c.Content == pricee) ?? new Price { Content = pricee }
                });
                ctx.SaveChanges();
            }
            return Content("");
        }
        [HttpGet]
        public ActionResult GetMenu(string token = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {

                Mapper mapper = new Mapper();
                List<ModelGlobalGroup> modelGlobalGroups = new List<ModelGlobalGroup>();


                ctx.GlobalGroups.ToList().ForEach(k => modelGlobalGroups.Add(mapper.MapGlobalGroup(k)));
                string json = JsonConvert.SerializeObject(modelGlobalGroups);
                return Content(json, "application/json");
            }
            return Content("");
        }
        [HttpGet]
        public ActionResult GetProducts(string numPage = "", string groupId = "", string token = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int idGroup = 0; Int32.TryParse(groupId, out idGroup);
                int startSkip = (Int32.Parse(numPage) - 1) * 20;

                var products = ctx.Products.OrderBy(k => k.Id).Where(q => q.Group.Id == idGroup && q.InStock == true).Select(z => new { id = z.Id, name = z.Name, description = z.Description, image = z.Images.FirstOrDefault().Name }).Skip(startSkip).Take(20).ToList();
                var countProducts = ctx.Products.OrderBy(k => k.Id).Where(q => q.Group.Id == idGroup && q.InStock == true).Count();
                string json = JsonConvert.SerializeObject(new { products = products, countProducts = countProducts });
                return Content(json, "application/json");
            }
            return Content("");
        }
        [HttpGet]
        public ActionResult GetMinProduct(string id = "", string token = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int idProduct = 0; Int32.TryParse(id, out idProduct);

                var product = ctx.Products.Select(q => new { id = q.Id, name = q.Name, description = q.Description, img = q.Images.FirstOrDefault().Name }).FirstOrDefault(w => w.id == idProduct);
                string json = JsonConvert.SerializeObject(product);
                return Content(json, "application/json");

            }
            return Content("");
        }
        [HttpGet]
        public ActionResult GetProduct(string id = "", string token = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int idProduct = 0; Int32.TryParse(id, out idProduct);

                Mapper mapper = new Mapper();
                var product = ctx.Products.FirstOrDefault(q => q.Id == idProduct);
                var mapProduct = mapper.MappingProduct(product);
                string json = JsonConvert.SerializeObject(mapProduct);
                return Content(json, "application/json");

            }
            else
            {
                return Content("");
            }
        }
        [HttpPost]
        public ContentResult UploadImage(HttpPostedFileBase image)
        {

            Bitmap imageBig = Utils.CreateImage(image, 400, 600);
            string path = Server.MapPath("/Image/");
            string fileExtension = System.IO.Path.GetExtension(image.FileName);
            Guid imageName = Guid.NewGuid();
            string savepath = path + imageName + fileExtension;
            imageBig.Save(savepath, ImageFormat.Jpeg);
            string json = JsonConvert.SerializeObject(imageName + fileExtension);
            return Content(json, "application/json");
        }
        [HttpPost]
        public ContentResult DeleteProduct(string id = "", string token = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int idProduct = 0; Int32.TryParse(id, out idProduct);

                var product = ctx.Products.FirstOrDefault(q => q.Id == idProduct);
                product.InStock = false;
                ctx.SaveChanges();

            }
            return Content("");
        }
        [HttpPost]
        public ActionResult DeleteSizeer(string id, string token = "")
        {
            bool tok = ChekToken(token);
            if (tok == true)
            {
                int idSizeer = 0; Int32.TryParse(id, out idSizeer);

                var sizeer = ctx.Sizeers.FirstOrDefault(q => q.Id == idSizeer);
                sizeer.InStock = false;
                ctx.SaveChanges();

            }
            return Content("");
        }
        public bool ChekToken(string token)
        {

            bool chek;
            if (ctx.Owners.FirstOrDefault().Token == token)
            {
                chek = true;
                return chek;
            }
            else
            {
                chek = false;
                return chek;
            }
        }

    }
}