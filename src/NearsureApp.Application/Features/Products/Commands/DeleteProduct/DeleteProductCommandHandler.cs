
using MediatR;
using NearsureApp.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace NearsureApp.Application.Features.Products.Commands.DeleteProduct;

public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products.FindAsync(request.Id);

        if (product == null)
        {
            // Handle not found case
            return Unit.Value;
        }

        _context.Products.Remove(product);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
