using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MHatka.Models
{
    public class Owner
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Count { get; set; }
        public string Token { get; set; }
    }
}