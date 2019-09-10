namespace MHatka.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTableToMainProducts : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TopProducts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Image = c.String(),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TopProducts");
        }
    }
}
