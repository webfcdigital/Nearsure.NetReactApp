
using MediatR;

namespace NearsureApp.Application.Features.Products.Commands.DeleteProduct;

public class DeleteProductCommand : IRequest
{
    public Guid Id { get; set; }
}
