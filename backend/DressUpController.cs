using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
public class DressUpController : ControllerBase
{
    private const string IconFileName = "icon.png";
    private const string MainFileName = "main.png";
    private const int CharacterZIndex = 100;
    private const int DefaultZIndex = 200;
    private AssetsOptions _options;

    public DressUpController(IOptions<AssetsOptions> options)
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
                Path.Combine(_options.Prefix, dirName, IconFileName)))
            .ToList();
    }
    public record CharacterListing(string Identifier, string IconUrl);

    [HttpGet("clothing-data/{identifier}")]
    public ActionResult<DressUpData> GetCharacterData(string identifier)
    {
        string path = Path.Combine(_options.Directory, identifier);
        List<string> files;
        try
        {
            files = Directory.EnumerateFiles(path).Select(f => Path.GetFileName(f))
                .Where(f => f != IconFileName && f != MainFileName)
                .OrderBy(f => f)
                .ToList();
        }
        catch (DirectoryNotFoundException)
        {
            return NotFound();
        }

        return new DressUpData(new ItemData(Path.Combine(_options.Prefix, identifier, MainFileName), CharacterZIndex),
            files.Select(file => ParseItemData(identifier, file)).ToList());
    }

    private ItemData ParseItemData(string identifier, string filename)
    {
        string pattern = @"(?<before>.*)_(?<number>\d+)\.\w+$";
        Regex regex = new Regex(pattern);
        Match match = regex.Match(filename);

        int? number = null;
        if (match.Success)
        {
            number = int.Parse(match.Groups["number"].Value);
        }

        return new ItemData(
            Path.Combine(_options.Prefix, identifier, filename), number ?? DefaultZIndex
        );
    }
}

public record DressUpData(ItemData CharacterData, List<ItemData> ItemsData);
public record ItemData(string Url, int Z);