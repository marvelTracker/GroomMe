namespace Web.API.Kata.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _20160320 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Courses", "UserId", c => c.String(maxLength: 500));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Courses", "UserId");
        }
    }
}
