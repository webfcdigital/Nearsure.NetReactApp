
using MediatR;
using NearsureApp.Application.Interfaces;
using NearsureApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace NearsureApp.Application.Features.Products.Queries.GetProducts;

public class GetProductsQuery : IRequest<List<Product>>
{
}

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<Product>>
{
    private readonly IApplicationDbContext _context;

    public GetProductsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Products.ToListAsync(cancellationToken);
    }
}
