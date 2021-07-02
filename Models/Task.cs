namespace taskManager.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public bool Important { get; set; }

        // TODO: change str to date
        public string StartDate { get; set; }

        public string DueDate { get; set; }

        public string Description { get; set; }

        public int Status { get; set; }

        public string User { get; set; }

        public Task()
        {
        }
    }
}