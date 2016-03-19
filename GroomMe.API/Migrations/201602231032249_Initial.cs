namespace Web.API.Kata.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        Description = c.String(maxLength: 500),
                        AddedDate = c.DateTime(nullable: false),
                        ModifDateTime = c.DateTime(nullable: false),
                        CreatedDateTime = c.DateTime(nullable: false),
                        Course_CourseId = c.Int(),
                    })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.Courses", t => t.Course_CourseId)
                .Index(t => t.Course_CourseId);
            
            CreateTable(
                "dbo.Courses",
                c => new
                    {
                        CourseId = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 500),
                        StartedDateTime = c.DateTime(nullable: false),
                        EndDateTime = c.DateTime(nullable: false),
                        Author = c.String(maxLength: 500),
                        CourseStatus = c.Int(nullable: false),
                        ImagePath = c.String(maxLength: 500),
                        Precentage = c.Int(nullable: false),
                        ModifDateTime = c.DateTime(nullable: false),
                        CreatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.CourseId);
            
            CreateTable(
                "dbo.Tags",
                c => new
                    {
                        TagId = c.Int(nullable: false, identity: true),
                        TagName = c.String(maxLength: 500),
                        TagImage = c.String(maxLength: 500),
                        ModifDateTime = c.DateTime(nullable: false),
                        CreatedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.TagId);
            
            CreateTable(
                "dbo.Status",
                c => new
                    {
                        StatusId = c.Int(nullable: false, identity: true),
                        StatusDescription = c.String(maxLength: 500),
                        UserId = c.Int(nullable: false),
                        AddedDateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.StatusId);
            
            CreateTable(
                "dbo.TagCourses",
                c => new
                    {
                        Tag_TagId = c.Int(nullable: false),
                        Course_CourseId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Tag_TagId, t.Course_CourseId })
                .ForeignKey("dbo.Tags", t => t.Tag_TagId, cascadeDelete: true)
                .ForeignKey("dbo.Courses", t => t.Course_CourseId, cascadeDelete: true)
                .Index(t => t.Tag_TagId)
                .Index(t => t.Course_CourseId);
            
            CreateStoredProcedure(
                "dbo.Status_Insert",
                p => new
                    {
                        StatusDescription = p.String(maxLength: 500),
                        UserId = p.Int(),
                        AddedDateTime = p.DateTime(),
                    },
                body:
                    @"INSERT [dbo].[Status]([StatusDescription], [UserId], [AddedDateTime])
                      VALUES (@StatusDescription, @UserId, @AddedDateTime)
                      
                      DECLARE @StatusId int
                      SELECT @StatusId = [StatusId]
                      FROM [dbo].[Status]
                      WHERE @@ROWCOUNT > 0 AND [StatusId] = scope_identity()
                      
                      SELECT t0.[StatusId]
                      FROM [dbo].[Status] AS t0
                      WHERE @@ROWCOUNT > 0 AND t0.[StatusId] = @StatusId"
            );
            
            CreateStoredProcedure(
                "dbo.Status_Update",
                p => new
                    {
                        StatusId = p.Int(),
                        StatusDescription = p.String(maxLength: 500),
                        UserId = p.Int(),
                        AddedDateTime = p.DateTime(),
                    },
                body:
                    @"UPDATE [dbo].[Status]
                      SET [StatusDescription] = @StatusDescription, [UserId] = @UserId, [AddedDateTime] = @AddedDateTime
                      WHERE ([StatusId] = @StatusId)"
            );
            
            CreateStoredProcedure(
                "dbo.Status_Delete",
                p => new
                    {
                        StatusId = p.Int(),
                    },
                body:
                    @"DELETE [dbo].[Status]
                      WHERE ([StatusId] = @StatusId)"
            );
            
        }
        
        public override void Down()
        {
            DropStoredProcedure("dbo.Status_Delete");
            DropStoredProcedure("dbo.Status_Update");
            DropStoredProcedure("dbo.Status_Insert");
            DropForeignKey("dbo.TagCourses", "Course_CourseId", "dbo.Courses");
            DropForeignKey("dbo.TagCourses", "Tag_TagId", "dbo.Tags");
            DropForeignKey("dbo.Comments", "Course_CourseId", "dbo.Courses");
            DropIndex("dbo.TagCourses", new[] { "Course_CourseId" });
            DropIndex("dbo.TagCourses", new[] { "Tag_TagId" });
            DropIndex("dbo.Comments", new[] { "Course_CourseId" });
            DropTable("dbo.TagCourses");
            DropTable("dbo.Status");
            DropTable("dbo.Tags");
            DropTable("dbo.Courses");
            DropTable("dbo.Comments");
        }
    }
}
