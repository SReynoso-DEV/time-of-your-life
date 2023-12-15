using System.ComponentModel.DataAnnotations;

namespace time_of_your_life.Models
{
    public class PresetEntity
    {
        public Guid? Id { get; set; }
        public string FontFamily { get; set; }
        public string TitleText { get; set; }
        public int TitleFontSize { get; set; }
        public int ClockFontSize { get; set; }
        public bool BlinkColons { get; set; }
        public string FontColor { get; set; }
        public string ClockFontColor { get; set; }
        public string TimeZone { get; set; }
    }
}
