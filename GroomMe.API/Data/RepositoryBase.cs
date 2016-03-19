using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;
using MVC.Kata.Data;

namespace Web.API.Kata.Data
{
    public abstract class RepositoryBase<T>:IRepository<T> where T : class, IModifiedEntity
    { 
        public void Create(T entity)
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                entity.CreatedDateTime = DateTime.Now;
                entity.ModifyDateTime = DateTime.Now;

                dataContext.Set<T>().Add(entity);
                dataContext.SaveChanges();
            }
        }

        public void Update(T entity)
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                try
                {
                    entity.ModifyDateTime = DateTime.Now;

                    dataContext.Entry(entity).State = EntityState.Modified;
                    dataContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    var entry = ex.Entries.Single();
                }
               
            }
        }

        public IQueryable<T> FindById(Expression<Func<T, bool>> predicate)
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                return dataContext.Set<T>().Where(predicate);
            }
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual async Task<IList<T>> GetAllAsync()
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                var results = await dataContext.Set<T>().ToListAsync();
                return results;
            }
        }

        public virtual  async Task CreateAsync(T entity)
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                entity.CreatedDateTime = DateTime.Now;
                entity.ModifyDateTime = DateTime.Now;

                dataContext.Set<T>().Add(entity);
                await dataContext.SaveChangesAsync();
            }
        }

        public virtual  async Task UpdateAsync(T entity)
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                try
                {
                    entity.ModifyDateTime = DateTime.Now;

                    dataContext.Entry(entity).State = EntityState.Modified;
                    dataContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    var entry = ex.Entries.Single();
                }

            }
        }

        public T Get(Expression<Func<T, bool>> predicate)
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                return dataContext.Set<T>().Where(predicate).FirstOrDefault();
            }  
        }

        public virtual async Task<T> GetAsync(Expression<Func<T, bool>> predicate)
        {
            using (StoreDataContext dataContext = new StoreDataContext())
            {
                var result = await dataContext.Set<T>().Where(predicate).FirstOrDefaultAsync();
                return result;
            }
        }
    }
}