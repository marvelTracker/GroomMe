using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using MVC.Kata.Data;
using MVC.Kata.Models;
using Newtonsoft.Json;
using Web.API.Kata.Data;

namespace Web.API.Kata.Controllers
{
    
    public class CourseDataController : ApiController
    {
        private CourseRepository _courseRepository;
        private TagsRepository _tagRepository;

        public CourseDataController(CourseRepository courseRepository, TagsRepository tagsRepository)
        {
            _courseRepository = courseRepository;
            _tagRepository = tagsRepository;
        }


        // GET api/coursedata
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        [System.Web.Http.Authorize(Roles = "Administrator")]
        public async Task<IHttpActionResult> Get()
        {
            var results = await GetViewModels();

            return Ok(results);
        }

        // GET api/coursedata/5
        public async Task<IHttpActionResult> Get(int id)
        {
            var result = await GetViewModel(id);

            return Ok(result);
        }

        private async Task<CourseViewModel> GetViewModel(int id)
        {
           var course = await _courseRepository.GetAsync(s=>s.CourseId == id);

           return GetCourseViewModel(course);
        }

        // POST api/coursedata
        [System.Web.Http.Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IHttpActionResult> Post([FromBody]CourseViewModel courseViewModel)
        {
            var course = await GetCourseByCourseViewModel(courseViewModel);

            await _courseRepository.CreateAsync(course);

            return Ok();
        }

        private async Task<Course> GetCourseByCourseViewModel(CourseViewModel courseViewModel)
        {
            IList<Tag> tagList = new List<Tag>();

            //Todo: need to move this to View model converter factory
            Course course = new Course()
            {
                Author = courseViewModel.Author,
                Description = courseViewModel.Description,
                StartedDateTime = courseViewModel.StartedDateTime,
                EndDateTime = courseViewModel.EndDateTime,
                Precentage = courseViewModel.Precentage,
                Name = courseViewModel.Name,
                CourseStatus = courseViewModel.CourseStatus,
                Tags = tagList,
                CourseId = courseViewModel.CourseId
            };

            var tags = JsonConvert.DeserializeObject<TagViewModel[]>(courseViewModel.Tags);

            foreach (TagViewModel tagViewModel in tags)
            {
                string tagName = tagViewModel.Text;

                Tag dbTag = _tagRepository.Get(s => s.TagName == tagName);

                if (dbTag == null)
                {
                    Tag newTag = new Tag() {TagName = tagName};

                    //new Tag add to the database
                    await _tagRepository.CreateAsync(newTag);

                    tagList.Add(newTag);
                }
                else
                {
                    tagList.Add(dbTag);
                }
            }
            return course;
        }

        // PUT api/coursedata/5
        public async Task<IHttpActionResult> Put(int id, [FromBody]CourseViewModel courseViewModel)
        {
            var course = await GetCourseByCourseViewModel(courseViewModel);

            await _courseRepository.UpdateAsync(course);

            return Ok();
        }

        //This is for partial update.
        public void Patch(int id, [FromBody]string value)
        {
        }


        // DELETE api/coursedata/5
        public void Delete(int id)
        {
        }

        private async Task<IList<CourseViewModel>> GetViewModels()
        {

            var result = await _courseRepository.GetAllAsync();
            var returnList = new List<CourseViewModel>();

            foreach (var course in result)
            {
                var viewModel = GetCourseViewModel(course);

                returnList.Add(viewModel);
            }

            return returnList;

        }

        private CourseViewModel GetCourseViewModel(Course course)
        {
            CourseViewModel viewModel = new CourseViewModel
            {
                Name = course.Name,
                Author = course.Author,
                CourseId = course.CourseId,
                StartedDateTime = course.StartedDateTime,
                EndDateTime = course.EndDateTime,
                Precentage = course.Precentage,
                Description = course.Description,
                CourseStatus = course.CourseStatus,
                Tags = GetTagViewModels(course.Tags)
            };
            return viewModel;
        }

        private TagViewModel[] GetTagViewModels(IList<Tag> tags)
        {
            IList<TagViewModel> resultList = new List<TagViewModel>();
            
            foreach (var tag in tags)
            {
                resultList.Add(new TagViewModel(){Text = tag.TagName});
            }

            return resultList.ToArray();
        }
    }
}
