﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Permissions;
using System.Threading.Tasks;
using System.Web;

namespace Web.API.Kata.Data
{
    public interface IRepository<T>
    {
        void Create(T entity);

        void Update(T entity);

        IQueryable<T> FindById(System.Linq.Expressions.Expression<Func<T, bool>> predicate);

        void Delete(int id);

        Task<IList<T>> GetAllAsync(string userId);

        Task<IList<T>> GetAllAsync();

        Task CreateAsync(T entity);

        Task UpdateAsync(T entity);

        Task DeleteAsync(int id);

        T Get(System.Linq.Expressions.Expression<Func<T, bool>> predicate);

        Task<T> GetAsync(Expression<Func<T, bool>> predicate);
    }
}