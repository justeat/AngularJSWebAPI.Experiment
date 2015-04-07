using System.Collections.Generic;
using System.Web.Http;
using AngularJSWebAPI.Experiment.Models;

namespace AngularJSWebAPI.Experiment.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        // GET: /api/users
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            var result = GetUsers();
            return Ok(result);
        }

        // GET: /api/users/{id}
        [HttpGet]
        [Route("{id}", Name = "GetUserById")]
        public IHttpActionResult GetById(int id)
        {
            var result = new User();
            return Ok(result);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(User model)
        {
            return CreatedAtRoute("GetUSerById", new {id = model.Id}, model);
        }

        // PUT: /api/users/{id}
        [HttpPut]
        [Route("{id}")]
        public IHttpActionResult Update(string id, User model)
        {
            return Ok(model);
        }

        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult Delete(string id)
        {
            return Ok();
        }

        private List<User> GetUsers()
        {
            return new List<User>
            {
                new User { Id = 1 , DisplayName = "Ahmed"},
                new User { Id = 2 , DisplayName = "John"},
                new User { Id = 3 , DisplayName = "Tom"},
                new User { Id = 4 , DisplayName = "Mark"},
            };
        }
    }
}