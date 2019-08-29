using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MHatka.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Article { get; set; }
        public string Description { get; set; }
        public bool InStock { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual Brend Brend { get; set; }
        public virtual Country Country { get; set; }
        public virtual Filler Filler { get; set; }
        public virtual Group Group { get; set; }
        public virtual Material Material { get; set; }
        public virtual ICollection<Sizeer> Sizeers { get; set; }
        public virtual Special Special { get; set; }
        public virtual TypeCloth TypeCloth { get; set; }
    }
}