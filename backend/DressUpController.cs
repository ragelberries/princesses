using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("dressup")]
public class DressUpController : ControllerBase
{

    [HttpGet("character-listing")]
    public async Task<ActionResult<IEnumerable<CharacterListing>>> GetCharacterListing()
    {
        await Task.CompletedTask;

        return new List<CharacterListing>
        {
            new CharacterListing("young", "Young Princess", "/princesses/young/icon.png")
        };
    }
    public record CharacterListing(string Identifier, string DisplayName, string IconUrl);
}