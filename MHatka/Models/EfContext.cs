namespace MHatka.Models
{
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class EfContext : DbContext
    {
        public EfContext()
            : base(/*"EFContext"*/GetConnectionString())
        {
        }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Brend> Brends { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Filler> Fillers { get; set; }
        public DbSet<GlobalGroup> GlobalGroups { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Sizeer> Sizeers { get; set; }
        public DbSet<Special> Specials { get; set; }
        public DbSet<TypeCloth> TypeCloths { get; set; }
        public DbSet<TopProduct> TopProducts { get; set; }
        private static string GetConnectionString() //TestVersion
        {
            string dbname = "modnahatka";
            string username = "tekstylrivne";
            string password = "1111sasha";
            string hostname = "scp.realhost.com.ua";
            return "Data Source=" + hostname + ";Initial Catalog = " + dbname + ";User ID=" + username + ";Password=" + password + ";";
        }

    }
}