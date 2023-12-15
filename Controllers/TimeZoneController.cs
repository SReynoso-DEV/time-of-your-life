using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using time.Controllers;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using time_of_your_life.Data;

namespace time_of_your_life.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TimeZoneController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            string endpoint = "https://timeapi.io/api/TimeZone/AvailableTimeZones";

            try
            {
                using (HttpClient client = new HttpClient())
                {
                    HttpResponseMessage response = await client.GetAsync(endpoint);
                    string responseBody = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {

                        List<string> timeZones = JsonSerializer.Deserialize<List<string>>(responseBody);

                        return Ok(timeZones);
                    }
                    else
                    {
                        return BadRequest(responseBody);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
