namespace Web.API.Kata.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDescription : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "Description", c => c.String(maxLength: 500));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Courses", "Description");
        }
    }
}
