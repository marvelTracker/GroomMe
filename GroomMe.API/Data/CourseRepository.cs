using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;
using MVC.Kata.Data;

namespace Web.API.Kata.Data
{
    public class CourseRepository:RepositoryBase<Course>
    {
        public override async Task CreateAsync(Course entity)
        {
            using (StoreDataContext dbContext = new StoreDataContext())
            {
                foreach (var tags in entity.Tags)
                {
                    dbContext.Entry(tags).State = EntityState.Unchanged;
                    dbContext.Tags.Attach(tags);
                }

                entity.CreatedDateTime = DateTime.Now;
                entity.ModifyDateTime = DateTime.Now;

                dbContext.Courses.Add(entity);

                await dbContext.SaveChangesAsync();
            }
        }

        public override async Task UpdateAsync(Course entity)
        {
            using (StoreDataContext dbContext = new StoreDataContext())
            {
                var course = dbContext.Courses.FirstOrDefault(s=> s.CourseId == entity.CourseId);

                course.Name = entity.Name;
                course.Precentage = entity.Precentage;
                course.StartedDateTime = entity.StartedDateTime;
                course.EndDateTime = entity.EndDateTime;
                course.Description = entity.Description;
                course.Author = entity.Author;
                course.ModifyDateTime = DateTime.Now;
                course.CourseStatus = entity.CourseStatus;

                course.Tags.Clear();
                
                foreach (var tags in entity.Tags)
                {
                    var dbTag = dbContext.Tags.FirstOrDefault(s=>s.TagId == tags.TagId);
                    course.Tags.Add(dbTag);
                }
                
                await dbContext.SaveChangesAsync();
            }
        }

        public override async Task<IList<Course>> GetAllAsync()
        {
            using (StoreDataContext dbContext = new StoreDataContext())
            {
                var results = await dbContext.Courses.Include("Tags").ToListAsync();
                return results;
            }

        }

        public override async Task<Course> GetAsync(Expression<Func<Course, bool>> predicate)
        {
            using (StoreDataContext dbContext = new StoreDataContext())
            {
                var result = await dbContext.Courses.Where(predicate).Include("Tags").FirstOrDefaultAsync();
                return result;
            }
        }
    }
}