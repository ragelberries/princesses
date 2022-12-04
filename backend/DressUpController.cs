using Microsoft.AspNetCore.Mvc;

[ApiController]
public class DressUpController : ControllerBase
{

    [HttpGet("character-listing")]
    public async Task<ActionResult<IEnumerable<CharacterListing>>> GetCharacterListing()
    {
        await Task.CompletedTask;

        return new List<CharacterListing>
        {
            new CharacterListing("young", "Young Princess", "/princesses/young/icon.png"),
            new CharacterListing("young2", "Young Princess 2", "/princesses/young/icon.png"),
        };
    }
    public record CharacterListing(string Identifier, string DisplayName, string IconUrl);

    [HttpGet("character-data/{identifier}")]
    public async Task<ActionResult<DressUpData>> GetCharacterData(string identifier)
    {
        await Task.CompletedTask;

        if (identifier == "young")
        {
            return new DressUpData(new ItemData("/princesses/young/princess.png", 100),
            new List<ItemData>
            {
            new ItemData("/princesses/young/dress1.png", 200),
            new ItemData("/princesses/young/dress2.png", 200),
            new ItemData("/princesses/young/dress3.png", 200),
            new ItemData("/princesses/young/bow.png", 400),
            new ItemData("/princesses/young/crown.png", 300),
            new ItemData("/princesses/young/wings.png", 0),
            });
        }

        return NotFound();

    }
    public record DressUpData(ItemData CharacterData, List<ItemData> ItemsData);
    public record ItemData(string Url, int Z);
}