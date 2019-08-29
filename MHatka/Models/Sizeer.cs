using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MHatka.Models
{
    public class Sizeer
    {
        public int Id { get; set; }
        public bool InStock { get; set; }
        public virtual Size Sizes { get; set; }
        public virtual Price Prices { get; set; }
    }
}