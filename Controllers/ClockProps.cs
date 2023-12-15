using System.ComponentModel.DataAnnotations;

namespace time.Controllers;

public class ClockProps {
  public Guid? Id { get; set; }
  
  [Required]
  public string FontFamily {get; set;} = "courier";    
  public int[] AvailableFontSizes {get; }  = new[] { 12, 24, 48, 64 };
  [Required]
  public int TitleFontSize {get; set;} 
  [Required]
  public int ClockFontSize {get ; set;} 
  [Required]
  public bool BlinkColons {get; set;}
  [Required]
  public string FontColor {get; set;} 
  [Required]
  public string TitleText { get; set; }
    [Required]

    public string ClockFontColor { get; set; }

    [Required]

    public string TimeZone { get; set; }
}