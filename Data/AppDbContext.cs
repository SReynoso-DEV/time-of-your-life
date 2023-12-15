using Microsoft.EntityFrameworkCore;
using time_of_your_life.Models;

namespace time_of_your_life.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<PresetEntity> Preset { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
