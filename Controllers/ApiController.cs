using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using taskManager.Models;
using System.Linq;

namespace taskManager.Controllers
{
    public class ApiController : Controller
    {
        private DataContext dbContext;

        public ApiController(DataContext db)
        {
            this.dbContext = db;
        }

        [HttpGet]
        public IActionResult Test()
        {
            var list = new List<string>();
            return Json(list);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = dbContext.Tasks.Where(t => t.Id < 90).OrderBy(t => t.Id).Take(50).ToList();
            return Json(tasks);
        }

        [HttpGet]
        public IActionResult ClearTasks()
        {
            // removeList ( getAll )
            dbContext.Tasks.RemoveRange(dbContext.Tasks.ToList());
            dbContext.SaveChanges();
            return Content("Tasks removed!");
        }

        [HttpGet]
        public IActionResult RemoveTask(int id)
        {
            var task = dbContext.Tasks.Find(id);
            dbContext.Tasks.Remove(task);
            dbContext.SaveChanges();
            return Content("Task removed!");
        }

        [HttpPost]
        public IActionResult SaveTask([FromBody] Task theTask)
        {

            // sanitize the user input before storing in DB 
            // sanitiza user input MVC C#

            System.Console.WriteLine("Saving an object: " + theTask.Title);

            // save object into db
            dbContext.Tasks.Add(theTask);
            dbContext.SaveChanges();

            return Json(theTask);
        }

    }
}