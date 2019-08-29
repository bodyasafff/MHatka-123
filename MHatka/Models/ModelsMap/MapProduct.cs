using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MHatka.Models.ModelsMap
{
    public class MapProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Article { get; set; }
        public string Description { get; set; }
        public List<string> Images { get; set; }
        public string Brend { get; set; }
        public string Country { get; set; }
        public string Filler { get; set; }
        public string Group { get; set; }
        public string Material { get; set; }
        public List<MapSizeer> MapSizeers {get;set;}
        public string Special { get; set; }
        public string TypeCloth { get; set; }
    }
}