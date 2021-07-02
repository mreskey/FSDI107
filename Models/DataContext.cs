using Microsoft.EntityFrameworkCore;

namespace taskManager.Models
{
    /*
        Everytime you change something on the models, run these:
            - dotnet ef migrations add <someName>
            - dotnet ef database update
    */
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        // which of my models wil become tables in the database
        public DbSet<Task> Tasks { get; set; }
    }
}