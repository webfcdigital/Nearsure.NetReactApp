
using Microsoft.EntityFrameworkCore;
using NearsureApp.Domain.Entities;

namespace NearsureApp.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Product> Products { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
