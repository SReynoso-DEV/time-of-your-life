using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using time_of_your_life.Data;
using time_of_your_life.Helper;

namespace time.Controllers;

[ApiController]
[Route("[controller]")]
public class ClockController : ControllerBase
{
    private readonly ILogger<ClockController> _logger;

    private readonly AppDbContext _dbContext;

    public ClockController(ILogger<ClockController> logger, AppDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet, Route("presets")]
    public IEnumerable<ClockProps> GetPresets()
    {
        _logger.LogInformation("Fetching presets...");
        return _dbContext.Preset.Select(x => MyMapper.FromEntityToDto(x));
    }

    [HttpPost("presets")]
    public async Task<IActionResult> AddPreset([FromBody] ClockProps preset)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Invalid preset to be added.");
            return BadRequest(ModelState);
        }

        preset.Id = Guid.NewGuid();
        var entityToAdd = MyMapper.FromDtoToEntity(preset);
        _dbContext.Add(entityToAdd);
        await _dbContext.SaveChangesAsync();

        _logger.LogInformation("Preset added succesfully - id : " + preset.Id);
        return Ok(preset);
    }

    [HttpGet, Route("time")]
    public DateTime GetTime()
    {

        return DateTime.Now;
    }
}
