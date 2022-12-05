var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<AssetsOptions>(
    builder.Configuration.GetSection(AssetsOptions.Assets));


if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("MyAllowSpecificOrigins",
                              policy =>
                              {
                                  policy.AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                              });
    });
}

var app = builder.Build();

if (builder.Environment.IsDevelopment())
{
    app.UseCors("MyAllowSpecificOrigins");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
