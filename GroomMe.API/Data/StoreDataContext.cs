using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.UI;

// ReSharper disable once CheckNamespace
namespace MVC.Kata.Data
{
    public class StoreDataContext : DbContext
    {
        public DbSet<Status> Status { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public StoreDataContext() : base("DefaultConnection")
        {
            this.Configuration.LazyLoadingEnabled = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Properties<string>().Configure(s=>s.HasMaxLength(500));

            modelBuilder.Entity<Status>().MapToStoredProcedures();
            base.OnModelCreating(modelBuilder);
        }
    }

    public class Status
    {
        public int StatusId { get; set; }
        public string StatusDescription { get; set; }
        public int UserId { get; set; }
        public DateTime AddedDateTime { get; set; }
    }

    public class Course: IModifiedEntity
    {
        public int CourseId { get; set; }
        public string Name { get; set; }
        public virtual IList<Tag> Tags { get; set; }
        public DateTime StartedDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public string Author { get; set; }
        public CourseStatus CourseStatus { get; set; }
        public virtual IList<Comment> Comments { get; set; }
        public string ImagePath { get; set; }
        public int Precentage { get; set; }
        public DateTime ModifyDateTime { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
    }

    public class Tag : IModifiedEntity
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
        public string TagImage { get; set; }
        public DateTime ModifyDateTime { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public virtual IList<Course> Courses { get; set; } 
    }

    public enum CourseStatus
    {
        New =0, 
        Todo =1,
        InProgress=2,
        Done = 3
        
    }

    public class Comment : IModifiedEntity
    {
        public int CommentId { get; set; }
        public string Description { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime ModifyDateTime { get; set; }
        public DateTime CreatedDateTime { get; set; }
    }

    public interface IModifiedEntity
    {
        DateTime ModifyDateTime { get; set; }

        DateTime CreatedDateTime { get; set; }
    }
}