---
layout: post
title:  "Looping/Infinite ViewPager"
date:   2017-11-08
description: How to correctly implement a looping/infinite ViewPager in Android.
categories:
- blog
package: net.toyknight.posts
permalink: /looping-view-pager/
comments: true
---

#### What internet tells us...

It looks like that the most popular answer on the internet for
implementing a looping/infinite ViewPager in Android is as shown below.

{% highlight java %}
public class LoopingViewPagerAdapter extends PagerAdapter {

    ......

    @Override
    public int getCount() {
        return Integer.MAX_VALUE;
    }

    ......

}
{% endhighlight %}

I was like :thinking: when I first saw this approach. Anyway, after some
research I finally found a correct way to implement this thing.

#### Correct Approach

The idea is quite simple. Let's assume we have three pages A, B, C. The way
we want to put them in the ViewPager is like this:

`[C][A][B][C][A]`

* We start with position 1.
* When hit position 0 -> jump to position 3.
* When hit position 4 -> jump to position 1.

#### Let's Get to Code

{% highlight java %}
/* Adapter */
public class LoopingViewPagerAdapter extends PagerAdapter {

    private ArrayList<Object> models;

    ......

    @Override
    public int getCount() {
        // Since we want to put 2 additional pages at left & right,
        // the actual size will plus 2.
        return models.size() == 0 ? 0 : models.size() + 2;
    }

    public int getRealCount() {
        return models.size();
    }

    @Override
    public Object instantiateItem(ViewGroup container, int position) {
        int modelPosition = mapPagerPositionToModelPosition(position);

        Object model = models.get(modelPosition);

        return // create view using the model.
    }

    private int mapPagerPositionToModelPosition(int pagerPosition) {
        // Put last page model to the first position.
        if (pagerPosition == 0) {
            return getRealCount() - 1;
        }
        // Put first page model to the last position.
        if (pagerPosition == getRealCount() + 1) {
            return 0;
        }
        return pagerPosition - 1;
    }

}
{% endhighlight %}

{% highlight java %}
/* Listener */
listener = new ViewPager.OnPageChangeListener() {

    private int jumpPosition = -1;

    @Override
    public void onPageScrolled(int position,
                               float positionOffset,
                               int positionOffsetPixels) {
        //We do nothing here.
    }

    @Override
    public void onPageSelected(int position) {
        if (position == 0) {
            //prepare to jump to the last page
            jumpPosition = adapter.getRealCount();

            //TODO: indicator.setActive(adapter.getRealCount() - 1)
        } else if (position == adapter.getRealCount() + 1) {
            //prepare to jump to the first page
            jumpPosition = 1;

            //TODO: indicator.setActive(0)
        } else {
            //TODO: indicator.setActive(position - 1)
        }
    }

    @Override
    public void onPageScrollStateChanged(int state) {
        //Let's wait for the animation to complete then do the jump.
        if (state == ViewPager.SCROLL_STATE_IDLE && jumpPosition >= 0) {
            //Jump without animation so the user is not aware what happened.
            viewPager.setCurrentItem(jumpPosition, false);
            //Reset jump position.
            jumpPosition = -1;
        }
    }
};
{% endhighlight %}

**NOTE:** Due to the way ViewPager is implemented, there's no
way you can completely swipe to the next page. So when touch up, the ViewPager
will determine the next page according to your scroll position and animate to it.
The bad part about this is that, `onPageSelected` is hit when the animation
starts. So if you do the jump here you will cancel scroll animation and it will
look weird. The better solution is to wait for the animation to complete and
then do the jump.

{% highlight java %}
/* Putting things together */
viewPager = (ViewPager) findViewById(R.id.view_pager_id);
viewPager.addOnPageChangeListener(listener);

adapter = new LoopingViewPagerAdapter(models);

viewPager.setAdapter(adapter);
viewPager.setCurrentItem(1, false);
{% endhighlight %}

Now we are done. Nice and easy. Let's get a beer. :beer:
