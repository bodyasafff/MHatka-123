namespace MHatka.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initilizedb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Brends",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Fillers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.GlobalGroups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Groups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        GlobalGroup_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GlobalGroups", t => t.GlobalGroup_Id)
                .Index(t => t.GlobalGroup_Id);
            
            CreateTable(
                "dbo.Images",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Product_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Products", t => t.Product_Id)
                .Index(t => t.Product_Id);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Article = c.String(),
                        Description = c.String(),
                        InStock = c.Boolean(nullable: false),
                        Brend_Id = c.Int(),
                        Country_Id = c.Int(),
                        Filler_Id = c.Int(),
                        Group_Id = c.Int(),
                        Material_Id = c.Int(),
                        Special_Id = c.Int(),
                        TypeCloth_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Brends", t => t.Brend_Id)
                .ForeignKey("dbo.Countries", t => t.Country_Id)
                .ForeignKey("dbo.Fillers", t => t.Filler_Id)
                .ForeignKey("dbo.Groups", t => t.Group_Id)
                .ForeignKey("dbo.Materials", t => t.Material_Id)
                .ForeignKey("dbo.Specials", t => t.Special_Id)
                .ForeignKey("dbo.TypeCloths", t => t.TypeCloth_Id)
                .Index(t => t.Brend_Id)
                .Index(t => t.Country_Id)
                .Index(t => t.Filler_Id)
                .Index(t => t.Group_Id)
                .Index(t => t.Material_Id)
                .Index(t => t.Special_Id)
                .Index(t => t.TypeCloth_Id);
            
            CreateTable(
                "dbo.Materials",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Sizeers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        InStock = c.Boolean(nullable: false),
                        Prices_Id = c.Int(),
                        Sizes_Id = c.Int(),
                        Product_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Prices", t => t.Prices_Id)
                .ForeignKey("dbo.Sizes", t => t.Sizes_Id)
                .ForeignKey("dbo.Products", t => t.Product_Id)
                .Index(t => t.Prices_Id)
                .Index(t => t.Sizes_Id)
                .Index(t => t.Product_Id);
            
            CreateTable(
                "dbo.Prices",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Content = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Sizes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Specials",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TypeCloths",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Owners",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        Password = c.String(),
                        Count = c.Int(nullable: false),
                        Token = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "TypeCloth_Id", "dbo.TypeCloths");
            DropForeignKey("dbo.Products", "Special_Id", "dbo.Specials");
            DropForeignKey("dbo.Sizeers", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.Sizeers", "Sizes_Id", "dbo.Sizes");
            DropForeignKey("dbo.Sizeers", "Prices_Id", "dbo.Prices");
            DropForeignKey("dbo.Products", "Material_Id", "dbo.Materials");
            DropForeignKey("dbo.Images", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.Products", "Group_Id", "dbo.Groups");
            DropForeignKey("dbo.Products", "Filler_Id", "dbo.Fillers");
            DropForeignKey("dbo.Products", "Country_Id", "dbo.Countries");
            DropForeignKey("dbo.Products", "Brend_Id", "dbo.Brends");
            DropForeignKey("dbo.Groups", "GlobalGroup_Id", "dbo.GlobalGroups");
            DropIndex("dbo.Sizeers", new[] { "Product_Id" });
            DropIndex("dbo.Sizeers", new[] { "Sizes_Id" });
            DropIndex("dbo.Sizeers", new[] { "Prices_Id" });
            DropIndex("dbo.Products", new[] { "TypeCloth_Id" });
            DropIndex("dbo.Products", new[] { "Special_Id" });
            DropIndex("dbo.Products", new[] { "Material_Id" });
            DropIndex("dbo.Products", new[] { "Group_Id" });
            DropIndex("dbo.Products", new[] { "Filler_Id" });
            DropIndex("dbo.Products", new[] { "Country_Id" });
            DropIndex("dbo.Products", new[] { "Brend_Id" });
            DropIndex("dbo.Images", new[] { "Product_Id" });
            DropIndex("dbo.Groups", new[] { "GlobalGroup_Id" });
            DropTable("dbo.Owners");
            DropTable("dbo.TypeCloths");
            DropTable("dbo.Specials");
            DropTable("dbo.Sizes");
            DropTable("dbo.Prices");
            DropTable("dbo.Sizeers");
            DropTable("dbo.Materials");
            DropTable("dbo.Products");
            DropTable("dbo.Images");
            DropTable("dbo.Groups");
            DropTable("dbo.GlobalGroups");
            DropTable("dbo.Fillers");
            DropTable("dbo.Countries");
            DropTable("dbo.Brends");
        }
    }
}
