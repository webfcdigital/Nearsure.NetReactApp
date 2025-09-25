
using MediatR;

namespace NearsureApp.Application.Features.Products.Commands.UpdateProduct;

public class UpdateProductCommand : IRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal Price { get; set; }
}
