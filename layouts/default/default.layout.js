jQuery(function($){
    const $gnb = $('.gnb');
    const $gnb_li = $gnb.find('>ul>li');
    const $gnb_a = $gnb.find('>ul>li>a');
    const $gnb_sub = $gnb.find('ul ul');

    // --- GNB (Global Navigation Bar) ---
    if($gnb_sub.length){
        $gnb.on('mouseenter', function(){
            $gnb.addClass('open');
        }).on('mouseleave', function(){
            $gnb.removeClass('open');
            $gnb_li.removeClass('hover');
        });
    }

    $gnb_a.on('mouseenter focus', function(){
        $(this).parent('li').addClass('hover').siblings('li').removeClass('hover');
    });

    $gnb.find('a').on('blur focusout', function(){
        setTimeout(function(){
            if($gnb.find('a:focus').length === 0){
                $gnb.trigger('mouseleave');
            }
        }, 100);
    });

    // --- Visual Slide ---
    const $visual = $('.visual');
    const $visual_list = $visual.find('>.list');
    const itemNum = $visual_list.find('>.item').length;
    
    $visual_list.addClass('total' + itemNum);
    
    // Paragraph position
    $visual.find('p').each(function(){
        const $this = $(this);
        $this.css('marginTop', Math.round(-$this.height() / 2));
    });
    $visual.find('a[href=""], a[href="#"]').on('click', function(e){
        e.preventDefault(); 
    });

    // Item num logic
    if(itemNum === 1){
        $visual.find('>button').remove();
    } else if(itemNum === 2){
        $visual_list.find('>.item:last-child').clone().prependTo($visual_list);
    } else if(itemNum === 3) {
        $visual_list.find('>.item:last-child').prependTo($visual_list);
    }

    const $vpn = $('.visual, .visual>button');

    $(window).on('load', function(){
        $vpn.height($visual_list.find('>.item:eq(1)').height());
    });

    let isAnimating = false;

    // Prev Button
    $visual.find('>.prev').on('click', function(){
        if(isAnimating) return;
        isAnimating = true;

        $visual_list.animate({
            left: '+=100%'
        }, 400, function(){
            const $last_item = $visual_list.find('>.item:last-child');
            if(itemNum === 3){
                $last_item.prependTo($visual_list);
            } else if(itemNum === 2) {
                $last_item.remove();
                $visual_list.find('>.item:last-child').clone().prependTo($visual_list);
            }
            $visual_list.css('left', '-100%');
            $vpn.height($visual_list.find('>.item:eq(1)').height());
            
            isAnimating = false;
        });
    });

    // Next Button
    $visual.find('>.next').on('click', function(){
        if(isAnimating) return;
        isAnimating = true;

        $visual_list.animate({
            left: '-=100%'
        }, 400, function(){
            const $first_item = $visual_list.find('>.item:first-child');
            if(itemNum === 3){
                $first_item.appendTo($visual_list);
            } else if(itemNum === 2) {
                $first_item.remove();
                $visual_list.find('>.item:first-child').clone().appendTo($visual_list);
            }
            $visual_list.css('left', '-100%');
            $vpn.height($visual_list.find('>.item:eq(1)').height());
            
            isAnimating = false;
        });
    });
});