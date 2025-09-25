FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and sln files to restore as a separate layer
COPY ["src/NearsureApp.sln", "src/"]
COPY ["src/NearsureApp.Api/NearsureApp.Api.csproj", "src/NearsureApp.Api/"]
COPY ["src/NearsureApp.Application/NearsureApp.Application.csproj", "src/NearsureApp.Application/"]
COPY ["src/NearsureApp.Domain/NearsureApp.Domain.csproj", "src/NearsureApp.Domain/"]
COPY ["src/NearsureApp.Infrastructure/NearsureApp.Infrastructure.csproj", "src/NearsureApp.Infrastructure/"]

RUN dotnet restore "src/NearsureApp.sln"

# Copy everything else and build
COPY . .
WORKDIR "/src/src/NearsureApp.Api"
RUN dotnet publish "NearsureApp.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "NearsureApp.Api.dll"]