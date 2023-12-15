using time.Controllers;
using time_of_your_life.Models;

namespace time_of_your_life.Helper
{
    public static class MyMapper
    {
        public static PresetEntity FromDtoToEntity(ClockProps dto)
        {
            return new PresetEntity
            {
                BlinkColons = dto.BlinkColons,
                ClockFontColor = dto.ClockFontColor,
                ClockFontSize = dto.ClockFontSize,
                FontColor = dto.FontColor,
                FontFamily = dto.FontFamily,
                Id = dto.Id,
                TimeZone = dto.TimeZone,
                TitleFontSize = dto.TitleFontSize,
                TitleText = dto.TitleText
            };
        }

        public static ClockProps FromEntityToDto(PresetEntity entity)
        {
            return new ClockProps
            {
                TitleText = entity.TitleText,
                ClockFontColor = entity.ClockFontColor,
                ClockFontSize = entity.ClockFontSize,
                BlinkColons = entity.BlinkColons,
                FontColor = entity.FontColor,
                FontFamily = entity.FontFamily,
                Id = entity.Id,
                TimeZone = entity.TimeZone,
                TitleFontSize = entity.TitleFontSize
            };            
        }

    }
}
