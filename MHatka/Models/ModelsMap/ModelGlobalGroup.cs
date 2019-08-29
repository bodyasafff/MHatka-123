using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MHatka.Models.ModelsMap
{
    public class ModelGlobalGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<MapGroup> Groups { get; set; }
    }
}