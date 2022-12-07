using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
public class AssetsController : ControllerBase
{
    private AssetsOptions _options;

    public AssetsController(IOptions<AssetsOptions> options)
    {
        _options = options.Value;
    }

    [HttpGet("character-listing")]
    public ActionResult<IEnumerable<CharacterListing>> GetCharacterListing()
    {
        IEnumerable<string> directories = Directory.GetDirectories(_options.Directory)
            .Select(d => new DirectoryInfo(d).Name);

        return directories.Select(dirName =>
            new CharacterListing(dirName,
                Path.Combine(_options.Prefix, dirName, "icon.png")))
            .ToList();
    }
    public record CharacterListing(string Identifier, string IconUrl);

    [HttpGet("character-data/{identifier}")]
    public ActionResult<DressUpData> GetCharacterData(string identifier)
    {
        string path = Path.Combine(_options.Directory, identifier);
        List<string> files;
        try
        {
            files = Directory.EnumerateFiles(path).Select(f => Path.GetFileName(f))
                .Where(f => f != "icon.png" && f != "main.png")
                .OrderBy(f => f)
                .ToList();
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound();
        }

        return new DressUpData(new ItemData(Path.Combine(_options.Prefix, identifier, "main.png"), 0),
            files.Select(file => ParseItemData(identifier, file)).ToList());
    }

    private ItemData ParseItemData(string identifier, string file)
    {
        return new ItemData(
            Path.Combine(_options.Prefix, identifier, file), 50
        );
    }
}

public record DressUpData(ItemData CharacterData, List<ItemData> ItemsData);
public record ItemData(string Url, int Z);