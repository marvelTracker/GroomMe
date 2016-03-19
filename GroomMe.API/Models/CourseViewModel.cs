using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVC.Kata.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Web.API.Kata;

namespace MVC.Kata.Models
{
    public class CourseViewModel
    {
        public int CourseId { get; set; }
        public string Name { get; set; }
        public dynamic Tags { get; set; }
        
        [JsonConverter(typeof(CustomDateConverter))]
        public DateTime StartedDateTime { get; set; }

        [JsonConverter(typeof(CustomDateConverter))]
        public DateTime EndDateTime { get; set; }
        public string Author { get; set; }
        public CourseStatus CourseStatus { get; set; }

        //public IList<Comment> Comments { get; set; }
        //public string ImagePath { get; set; }
        public int Precentage { get; set; }
        public string Description { get; set; }
    }

    public class TagViewModel
    {
        //public int TagId { get; set; }
        //public string TagName { get; set; }
        //public string TagImage { get; set; }

        public string Text { get; set; }
    }

    public class CommentViewModel
    {
        public int CommentId { get; set; }
        public string Description { get; set; }
        public DateTime AddedDate { get; set; }
    }

    
}