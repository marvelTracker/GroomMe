namespace Web.API.Kata.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fixtypoissue : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Comments", "ModifyDateTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.Courses", "ModifyDateTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.Tags", "ModifyDateTime", c => c.DateTime(nullable: false));
            DropColumn("dbo.Comments", "ModifDateTime");
            DropColumn("dbo.Courses", "ModifDateTime");
            DropColumn("dbo.Tags", "ModifDateTime");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Tags", "ModifDateTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.Courses", "ModifDateTime", c => c.DateTime(nullable: false));
            AddColumn("dbo.Comments", "ModifDateTime", c => c.DateTime(nullable: false));
            DropColumn("dbo.Tags", "ModifyDateTime");
            DropColumn("dbo.Courses", "ModifyDateTime");
            DropColumn("dbo.Comments", "ModifyDateTime");
        }
    }
}
