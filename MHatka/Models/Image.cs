using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MHatka.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Product Product { get; set; }
    }
}