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

    [HttpGet, Route("presets/{id}")]
    public IActionResult GetPresetById(Guid id)
    {
        _logger.LogInformation("Fetching one preset with id " + id);
        var preset = _dbContext.Preset.FirstOrDefault(x => x.Id == id);

        if (preset == null)
        {
            _logger.LogWarning("The preset " + id + " couldn't be found");
            return NotFound();
        }
        else
        {
            _logger.LogInformation("The preset " + id + " was found");
            return Ok(MyMapper.FromEntityToDto(preset));
        }
    }

    [HttpPut("presets/{id}")]
    public async Task<IActionResult> UpdatedPreset([FromBody] ClockProps preset, Guid id)
    {
        if (!ModelState.IsValid)
        {
            _logger.LogWarning("Invalid preset to be Updated.");
            return BadRequest(ModelState);
        }

        var p = _dbContext.Preset.Find(id);

        if (p == null)
        {
            _logger.LogWarning("The preset " + id + "couldn't be found.");
            return NotFound();
        }

        p.TitleText = preset.TitleText;
        p.ClockFontColor = preset.ClockFontColor;
        p.ClockFontSize = preset.ClockFontSize;
        p.TitleFontSize = preset.TitleFontSize;
        p.BlinkColons = preset.BlinkColons;
        p.FontColor = preset.FontColor;
        p.FontFamily = preset.FontFamily;
        p.TimeZone = preset.TimeZone;

        _dbContext.Update(p);
        await _dbContext.SaveChangesAsync();


        _logger.LogInformation("Preset updated succesfully - id : " + p.Id);

        return Ok(preset);
    }


    [HttpDelete, Route("presets")]
    public ActionResult Delete()
    {
        _logger.LogInformation("deleting presets...");
        var presets = _dbContext.Preset.ToList();
        _dbContext.Preset.RemoveRange(presets);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpGet, Route("time")]
    public DateTime GetTime()
    {

        return DateTime.Now;
    }
}
